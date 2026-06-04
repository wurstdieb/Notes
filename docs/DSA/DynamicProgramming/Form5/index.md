---
title: Form 5
---

Certain problems involve games played optimally between 2 or more players. The state here is the state of the game itself. A state is a **winning state** if and only if all states reachable from it are losing states. A **losing state** is one where at least one of the reachable next states is a winning state — meaning the opponent can always escape. Consider the problem:

Two players A and B are playing a game. The game ends when any player has no moves left. A move is defined as removing stones in a power of 2 from a bag of N stones. Assuming both players play optimally, for a given N decide if player A wins if they go first.

**Solution:**  
Let `DP(x)` return `1` if state `x` is a winning state, `0` if losing. `DP(x) = 1` if for any `i` such that `x >= 2^i`, `DP(x - 2^i) = 0`. Base case: `DP(0) = 0` since the player with no stones has no moves and loses.

TC: `O(N log N)` — N states, `O(log N)` transitions per state.

```cpp
int dp[MAXN];
memset(dp, -1, sizeof(dp));

int rec(int x){
    if(x == 0) return 0;
    if(dp[x] != -1) return dp[x];

    int ans = 0;
    for(int i = 1; (1 << i) <= x; i++){
        if(rec(x - (1 << i)) == 0){
            ans = 1;
            break; // found a losing state for opponent, current state is winning
        }
    }
    return dp[x] = ans;
}
```

**Note:** The winning/losing pattern here is non-trivial since `1` is not a valid move (`2^0` excluded). Computing the first few states manually reveals the losing states are `0, 1, 6, 7, 12, 13, 18, 19...` — pairs of consecutive losing states every 6 steps. The pattern is `N % 6 == 0 || N % 6 == 1`. Interestingly this is related to divisibility by 3 since 6 is a multiple of 3. The DP computes this for you rather than relying on deriving the closed form. For more complex game DP involving multiple piles or composite moves, look into **Sprague-Grundy theorem** — it generalizes this exact winning/losing state logic using Grundy values (nimbers).