---
title: Longest Increasing Subsequence
---

Given an array of positive integers, find the length of the `longest increasing subsequence`. [LINK](https://leetcode.com/problems/longest-increasing-subsequence/)

**Solution:** This can be solved using `Form 1` as we have a choice to take an element or drop it, ensuring taken elements are increasing in order. Assume the DP definition to be the Longest Increasing Subsequence in `array[i...N-1]`. We need to decide if we take the ith element or skip it. Skipping is free, but taking it requires knowing the last element taken — making it another state variable. The transition becomes `DP(i, last) = max(DP(i+1, last), DP(i+1, arr[i]) + 1)` if `arr[i] > last`.

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& arr) {
        int n = arr.size();
        int base = -(1e4 + 1);

        static int dp[2525][20020];
        memset(dp, 0, sizeof(dp));

        function<int(int,int)> rec = [&](int i, int last) -> int {
            if(i == n) return 0;
            if(last >= 0 && dp[i][last]) return dp[i][last];
            int ans = rec(i+1, last);
            if(arr[i] + base > last){
                ans = max(ans, 1 + rec(i+1, arr[i] + base));
            }
            if(last >= 0) dp[i][last] = ans;
            return ans;
        };

        return rec(0, -1);
    }
    /***
    Form 1 approach — TC too high, won't pass for large inputs.
    ***/
};
```

**Form 2 approach:** Let `dp[i]` be the length of the longest increasing subsequence ending at `i`. We find which element comes before `arr[i]` in the LIS. `DP(i) = max(DP(j) + 1)` for all `j < i` such that `arr[j] < arr[i]`.

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& arr) {
        int n = arr.size();
        int dp[2525];
        int ans = 0;

        for(int i = 0; i < n; i++){
            dp[i] = 1;
            for(int j = i-1; j >= 0; j--){
                if(arr[j] < arr[i]){
                    dp[i] = max(dp[i], 1 + dp[j]);
                }
            }
            ans = max(ans, dp[i]);
        }
        return ans;
    }
    /***
    Form 2 approach — O(N²), passes for N <= 2500.
    ***/
};
```

**DFS on DAG approach:** Build a directed graph where there's an edge from `i` to `j` if `arr[i] < arr[j]`. LIS length = longest path in this DAG. DFS from each node finds the longest path starting there. Memoization ensures each node is computed only once.

```cpp
class Solution {
public:
    int n;
    vector<int> g[2525];
    int dp[2525];

    int dfs(int x){
        if(dp[x] != -1) return dp[x];
        dp[x] = 1;
        for(int node : g[x]){
            dp[x] = max(dp[x], 1 + dfs(node));
        }
        return dp[x];
    }

    int lengthOfLIS(vector<int>& arr) {
        n = arr.size();
        memset(dp, -1, sizeof(dp));

        for(int i = 0; i < n; i++)
            for(int j = i+1; j < n; j++)
                if(arr[i] < arr[j])
                    g[i].push_back(j);

        int ans = 0;
        for(int i = 0; i < n; i++)
            ans = max(ans, dfs(i));

        return ans;
    }
    /***
    No vis[] needed — graph is a DAG (edges only go i → j where j > i),
    so no cycles exist. Memoization handles revisits.
    TC: O(N²) to build graph + O(N²) DFS = O(N²)
    ***/
};
```

**Brute Force:**

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& arr) {
        int n = arr.size();
        vector<pair<int,int>> v;
        for(int i = 0; i < n; i++){
            if(v.size() == 0){
                v.push_back({arr[i], 1}); continue;
            }

            int val = 0;
            for(int j = 0; j < v.size(); j++){
                auto p = v[j];
                if(p.first < arr[i]){
                    if(p.second > val){
                        val = p.second;
                    }
                }
            }

            if(!val) v.push_back({arr[i], 1});
            else v.push_back({arr[i], val+1});
        }
        int f = 0;
        for(auto p: v) f = max(f, p.second);
        return f;
    }
    /***
    Greedy tracking strategy using a vector of pairs (value, LIS length).
    For each element, scans linearly to find the longest valid sequence to extend.
    TC: O(N²) — nested linear scan for every element.
    SC: O(N) — tracking vector grows up to size N.
    ***/
};
```

**Note:** This can be done in `O(N log N)` using binary search. Try it on your own.