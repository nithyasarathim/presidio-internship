//https://leetcode.com/submissions/detail/1777950330/

//N-QUEENS

class Solution {
    public:
        bool validate(int r, int c, vector<string> brd, int n){
            for(int i=0;i<n;i++){
                if(brd[r][i]=='Q' || brd[i][c]=='Q') return false;
            }
            int tr=r;
            int tc=c;
            while(tr>=0 && tc>=0){
                if(brd[tr][tc]=='Q') return false;
                tr--;
                tc--;
            }
            tr=r;
            tc=c;
            while(tr<n && tc>=0){
                if(brd[tr][tc]=='Q') return false;
                tr++;
                tc--;
            }
            tr=r;
            tc=c;
            while(tr>=0 && tc<n){
                if(brd[tr][tc]=='Q') return false;
                tr--;
                tc++;
            }
            tr=r;
            tc=c;
            while(tr<n && tc<n){
                if(brd[tr][tc]=='Q') return false;
                tr++;
                tc++;
            }
            return true;
        }
        void solve(int r, vector<string>& brd, vector<vector<string>>& res, int n){
            if(r==n){
                res.push_back(brd);
                return;
            }
            for(int c=0;c<n;c++){
                if(validate(r,c,brd,n)){
                    brd[r][c]='Q';
                    solve(r+1,brd,res,n);
                    brd[r][c]='.';
                }
            }
        }
        vector<vector<string>> solveNQueens(int n) {
            vector<vector<string>> res;
            vector<string> brd;
            string s(n,'.');
            for(int i=0;i<n;i++) brd.push_back(s);
            solve(0,brd,res,n);
            return res;
        }
    };