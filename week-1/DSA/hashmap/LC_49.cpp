//https://leetcode.com/submissions/detail/1777927626/

//GROUP ANAGRAMS

class Solution {
    public:
        vector<vector<string>> groupAnagrams(vector<string>& strs) {
            map<string,vector<string>> mp;
            for(string i: strs){
                string w=i;
                sort(i.begin(),i.end());
                mp[i].push_back(w);
            }
            vector<vector<string>> ans;
            for(auto i: mp){
                ans.push_back(i.second);
            }
            return ans;
        }
    };