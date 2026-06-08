---
title: Longest Common Subsequence
---

Given two strings s, t, find the length of the longest common subsequence.

**Solution:**  
`DP(i,j)` = length of LCS of `s[0...i]` and `t[0...j]`. A cell `(i,j)` can be arrived at from three places — `(i-1,j)`, `(i,j-1)`, and `(i-1,j-1)`. So `DP(i,j) = max(DP(i-1,j), DP(i,j-1), DP(i-1,j-1) + 1)` if elements match, else `DP(i-1,j-1) + 0`.

TC: `O(N * M)`

**Iterative (Cleaner):**
```cpp
class Solution {
public:
    int longestCommonSubsequence(string s, string t) {
        /***
        Shift indices by 1 so dp[i+1][j+1] represents s[0...i], t[0...j].
        This avoids boundary checks entirely — dp[0][...] and dp[...][0]
        act as base cases representing empty strings, all initialized to 0.
        dp[i][j] = max of:
            - dp[i-1][j]   : skip current char of s
            - dp[i][j-1]   : skip current char of t
            - dp[i-1][j-1] + match : use both current chars if they match
        ***/
        static int dp[1010][1010];
        memset(dp, 0, sizeof(dp));

        int n = s.size();
        int m = t.size();

        for(int i = 0; i < n; i++){
            for(int j = 0; j < m; j++){
                dp[i+1][j+1] = max({dp[i][j+1], dp[i+1][j], dp[i][j] + (s[i] == t[j] ? 1 : 0)});
            }
        }
        return dp[n][m];
    }
};
```  

The same code but recursive:  
```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int dp[1010][1010] = {};
        
        int n = text1.size();
        int m = text2.size();
       dp[0][0] =  ((text1[0] == text2[0])?1:0);
        for(int i = 0 ; i < n;i++){
            for(int j = 0 ; j < m;j++){
                if(i==0 && j == 0)continue;
                int ans = 0;
                if(i-1>= 0){
                    ans = max(ans, dp[i-1][j]);
                }
                if(j-1>= 0){
                    ans = max(ans, dp[i][j-1]);
                }
                ans = max(ans, (((i-1>= 0 )&& (j-1>= 0))?dp[i-1][j-1]:0) + ((text1[i] == text2[j])?1:0));
                
                dp[i][j] = ans;
            }
        }
        return dp[n-1][m-1];
    }
};
```  
## Follow-up  
Now assume instead of 2 strings, the problem asks to find the LCS of 3 strings. Let those strings be:  
s = "AGGTAB", t = "GXTXATB', and u = "AXTGXB". It would only be natural to think that this can be solved by first finding the LCS of the first two strings i.e. "GTAB" and then finding the LCS of this string with the string u, which would give us "GB", but by visual inspection we can see that "ATB" is a better solution. The issue arises as while finding the LCS of the first two strings we don't consider smaller strings which later might yield better results overall, we ignore "ATB" as its a length 3 string , and take "GTAB" as its 4, but doing so would only lead to errors. So the only way to do it would be to do it parallely.    
```cpp
class Solution {
public:
    int longestCommonSubsequence(string s, string t, string u) {
        int dp[550][550][550] = {};
        for(int i = 0; i < s.size();i++){
            for(int j = 0; j < t.size();j++){
                for(int k = 0; k < u.size();k++){
                    bool b = (s[i] == t[j]) && (t[j] == u[k]);
                    dp[i+1][j+1][k+1] = max({dp[i][j+1][k+1], dp[i+1][j+1][k], dp[i+1][j][k+1]});
                    dp[i+1][j+1][k+1] = max(dp[i+1][j+1][k+1], dp[i][j][k] + (b?1:0));
                }
            }
        }
        int n = s.size();
        int m = t.size();
        int o = u.size();
        return dp[n][m][o];

    }
};
```   

**Note — Stack Overflow for Large DP Tables:**
```cpp
// Wrong — allocated on stack (~666MB), crashes immediately
int dp[550][550][550] = {};

// Correct — allocated on data segment (global memory)
static int dp[550][550][550];
memset(dp, 0, sizeof(dp));
```
The stack is a small fixed memory region (~1-8MB) used for local variables. Large DP tables exceed this limit and cause an immediate crash before any code runs. `static` moves the variable to the data segment which is limited only by your RAM. For competitive programming, declaring large arrays globally outside the function is the cleanest solution as you never have to think about it.