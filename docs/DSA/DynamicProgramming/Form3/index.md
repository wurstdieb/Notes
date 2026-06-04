---
title: Form 3
---

Problems that involve considering multiple sequences can be solved using Form 3. Note that the subproblem definition may differ from the actual problem to be solved. The DP state looks something like `(info_seq1, info_seq2, extra constraints...)`. Consider the question below:

Given two strings S, T find the length of the longest common substring and also print it. Given sizes `N, M <= 1e3`.

**Solution:**  
Let `DP(i, j)` be the length of the longest common substring ending at `i` in S and `j` in T. Note that the subproblem definition differs from the larger problem as we're forcing the substrings to end at `i` and `j`. The transition is based on the last elements of both strings being identical. If `S[i] == T[j]`, `DP(i, j) = 1 + DP(i-1, j-1)`, else `0`. The final answer is the maximum over all possible endings.  
Note: alternatively you can define `DP(i, j)` as the longest common substring starting at `i, j` — the transition then moves forward instead of backward. Use separate `dp` tables if keeping both versions.  
TC: `O(N * M)`

```cpp
int n = s.size();
int m = t.size();
int dp[1010][1010];
memset(dp, -1, sizeof(dp));

int rec(int i, int j){
    if(i == -1 || j == -1) return 0;
    if(dp[i][j] != -1) return dp[i][j];
    int ans = (s[i] == t[j]) ? (rec(i-1, j-1) + 1) : 0;
    return dp[i][j] = ans;
}

// Alternative: starting at i, j (use a separate dp table if using both)
int rec1(int i, int j){
    if(i == n || j == m) return 0;
    if(dp[i][j] != -1) return dp[i][j];
    int ans = (s[i] == t[j]) ? (rec1(i+1, j+1) + 1) : 0;
    return dp[i][j] = ans;
}

int maxLen = 0;
pair<int,int> p;
for(int i = 0; i < n; i++){
    for(int j = 0; j < m; j++){
        if(rec(i, j) >= maxLen){
            p.first = i;
            p.second = j;
            maxLen = rec(i, j);
        }
    }
}

string aux = "";
void generate(){
    for(int i = p.first; i > p.first - maxLen; i--)
        aux.append(1, s[i]);
    reverse(aux.begin(), aux.end());
}
```