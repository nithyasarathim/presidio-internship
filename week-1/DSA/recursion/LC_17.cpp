// https://leetcode.com/submissions/detail/1777960002/

// LETTER COMBINATIONS OF A PHONE NUMBER

class Solution {
    public:
        vector<string> bt={"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
        string digit="";
        void findCombinations(vector<string>& r, int idx, string w){
            if(idx>=digit.size()){
                r.push_back(w);
                return;
            }
            int n=digit[idx]-'0';
            for(char i: bt[n]){
                w.push_back(i);
                findCombinations(r,idx+1,w);
                w.pop_back();
            }
        }
        vector<string> letterCombinations(string d) {
            if(d=="") return {};
            string w="";
            vector<string> r;
            int idx=0;
            digit=d;
            findCombinations(r,idx,w);
            return r;
        }
    };