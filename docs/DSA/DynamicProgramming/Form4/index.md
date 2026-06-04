---
title: Form 4
---

Whenever you have a problem that needs to optimize merging or range deletion where the result of merging also feeds into further merges, it can be solved using Form 4. The states of the DP are the extreme ends of the range decided by the problem, along with other relevant constraints: `DP(L, R, ...)`. Consider the following problem:

Given an array of N color buckets where `arr[i]` is the color of the ith bucket, minimize the total smoke released on merging all buckets into a single bucket. The smoke released on mixing two colors `a, b` is `(a * b)` and the resultant color is `(a + b) % 100`. Colors are in range `[0...99]`.

**Solution:**  
Let `DP(l, r)` denote the minimum smoke produced upon merging `buckets[l...r]`. Consider the last merge to be between `resultant(l...mid)` and `resultant(mid+1...r)`, where `mid` ranges over `[l, r-1]`. `mid` cannot be `r` as that would cause infinite recursion.

`DP(l, r) = min over all mid of: rec(l, mid) + rec(mid+1, r) + res(l..mid) * res(mid+1..r)`

Convert `arr` to a prefix sum array first so that the resultant color of any range `[l...r]` can be computed in O(1) as `(arr[r] - arr[l-1]) % 100`.

TC: `O(N²)` states, `O(N)` transitions → `O(N³)` overall.

```cpp
const int inf = 1e9;
int n = arr.size();

// Convert arr to prefix sum first
for(int i = 1; i < n; i++) arr[i] += arr[i-1];

int dp[1010][1010];
memset(dp, -1, sizeof(dp));

int rec(int l, int r){
    if(l > r) return inf;
    if(l == r) return 0;
    if(dp[l][r] != -1) return dp[l][r];

    int ans = inf;
    for(int mid = l; mid < r; mid++){
        int r_left  = ((l == 0) ? arr[mid] : (arr[mid] - arr[l-1])) % 100;
        int r_right = (arr[r] - arr[mid]) % 100;
        ans = min(ans, rec(l, mid) + rec(mid+1, r) + r_left * r_right);
    }
    return dp[l][r] = ans;
}
```

**Note:** Unlike Form 2 where subproblems are independent prefixes, Form 4 subproblems are hierarchical — the result of merging `[l...mid]` feeds directly into the parent merge. The `%100` on colors ensures the resultant color stays in `[0...99]` as specified.