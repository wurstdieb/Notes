---
title: Form 2
---

When the dp subproblem gets reduced to finding a solution for `dp[0...i]`, to be able to solve for `dp[0...n]` it can be solved with form 2. Note that `dp[0...i]` might not be the answer to the problem but might be something that'll be needed to arrive at the final answer. Now it's not to say that it can't be solved with any other form, but it's easier to solve it considering the subproblems definition to be from `[0...i]`.  
Generally speaking array problems can either be solved with Form 1 (Knapsack), Form 2 (ending at i) or Form 4 (LRDP). Like in Form 1, the states are made using the constraints and the nodal state `i` itself. Consider the following problem:

Given an array of size N, and a positive integer K, maximize the sum of minimums of the K partitions. Given `N, K <= 1e3`.

**Solution:**  
Let `DP(i, X)` denote the maximum sum of minimums of X partitions. The transition tries to find the first element of the last partition. We can say `DP(i, X) = max(min(j...i) + DP(j-1, X-1))` where j can be anything in `[0...i]`. If we can figure out a way to optimally do this, our final answer will simply be `DP(N-1, K)`.  
Note that `i == -1` is the base case rather than `i == 0` because a partition can start at index 0, meaning the last valid subproblem consumes all elements down to index 0, leaving `i = -1` with `x = 0` remaining partitions.  
TC check: `O(N² * K)` — N*K states, each with an O(N) transition loop.

```cpp
const int inf = 1e9;
int n = v.size(); // let v be the input array
int dp[1010][1010];
memset(dp, -1, sizeof(dp));

int rec(int i, int x){
    if(x == 0 && i >= 0) return -inf;
    /***
    You have elements remaining but your partitions are done, so you never know
    if you're missing out on better contributing elements. Such a case is invalid.
    ***/
    if(i == -1){
        if(x == 0) return 0;
        return -inf;
    }

    if(dp[i][x] != -1) return dp[i][x];

    int ans = -inf;
    int m = inf;
    for(int j = i; j >= 0; j--){
        m = min(m, v[j]);
        ans = max(ans, m + rec(j-1, x-1));
    }
    /***
    We iterate over all starting positions j of the xth partition,
    tracking the running minimum from i down to j.
    ans = max of (min in xth partition + optimal solution for x-1 partitions over [0...j-1]).
    ***/

    return dp[i][x] = ans;
}
```