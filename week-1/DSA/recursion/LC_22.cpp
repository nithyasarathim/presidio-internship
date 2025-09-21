//https://leetcode.com/submissions/detail/1777958029/

//GENERATE PARENTHESES

class Solution {
    public:
        void backtrack(vector<string>& ans, int n, int l, int r, string s){
            if(l==n && r==n){
                ans.push_back(s);
                return;
            }
            if(l<n){
                s+='(';
                backtrack(ans,n,l+1,r,s);
                s.pop_back();
            }
            if(r<l){
                s+=')';
                backtrack(ans,n,l,r+1,s);
                s.pop_back();
            }
        }
        vector<string> generateParenthesis(int n) {
            vector<string> ans;
            string s="";
            backtrack(ans,n,0,0,s);
            return ans;
        }
    };