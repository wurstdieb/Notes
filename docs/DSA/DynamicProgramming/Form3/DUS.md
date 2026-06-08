--- 
title: Diff Utility String
---  

Given two strings X and Y, find the smallest Diff Utility String and also print it out. The diff utility string is a compressed representation of 2 strings, using which both the original strings can be reconstructed. Example:

X = "GTAB", Y = "TABC", DUS(X,Y) = "+GTAB-C"

Element with `+` goes to the first string, element with `-` goes to the second.

**Solution:**  
One way to do this would be to find the LCS length `l`, and say that `n-l` and `m-l` are the extra elements in both strings, so the DUS length will be `l + 2*(n-l) + 2*(m-l)`. Let's look at another approach that can also be used to reconstruct the LCS.

Let `DP(i,j)` represent the DUS length of substrings `s[i...n-1]` and `t[j...m-1]`. Without considering the length contributed by signs, `DP(i,j)` depends on 3 states — `DP(i+1,j)`, `DP(i,j+1)`, `DP(i+1,j+1)` — each contributing one extra letter, making it `DP(i,j) = min(DP(i+1,j), DP(i,j+1), DP(i+1,j+1)) + 1`. The last one contributes only if both elements are equal.

```cpp
string x, y;
cin >> x >> y;
int n = x.size();
int m = y.size();
const int inf = 1e9;
int dp[1010][1010];
int back[1010][1010]; // 0-> add x[i], 1-> add y[j], 2-> add x[i]/y[j] (equal)
memset(dp, -1, sizeof(dp));
memset(back, -1, sizeof(back));

int rec(int i, int j){
    if(i == n && j == m) return 0;
    /***
    Don't use || here — even if one string reaches end,
    the other still has elements to process.
    The if(i < n) and if(j < m) guards handle this:
    whichever string still has elements keeps moving forward.
    ***/
    if(dp[i][j] != -1) return dp[i][j];

    int ans = inf;
    if(i < n){
        if(rec(i+1, j) + 1 < ans){ ans = rec(i+1, j) + 1; back[i][j] = 0; }
    }
    if(j < m){
        if(rec(i, j+1) + 1 < ans){ ans = rec(i, j+1) + 1; back[i][j] = 1; }
    }
    if(i < n && j < m && x[i] == y[j]){
        if(rec(i+1, j+1) + 1 < ans){ ans = rec(i+1, j+1) + 1; back[i][j] = 2; }
    }

    return dp[i][j] = ans;
}

string aux = "";
void generate(int i, int j){
    if(i == n && j == m)return;
    int ch = back[i][j];
    if(ch == 0){
        aux.push_back('+');
        aux.push_back(x[i]);
        generate(i+1, j);
        return;
    }
    else if(ch == 1){
        aux.push_back('-');
        aux.push_back(y[j]);
        generate(i,j+1);
        return;
    }else if(ch == 2){
        aux.push_back(x[i]);
        generate(i+1,j+1);
        return;
    }
}

cout << "DUS:" << aux;
```