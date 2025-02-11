// src/utils/apiHelpers.js
export const fetchLeetCodeStats = async (username) => {
    try {
      const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);
      const data = await response.json();
      return {
        username,
        totalSolved: data.totalSolved,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
        ranking: data.ranking,
      };
    } catch (error) {
      console.error("Error fetching LeetCode stats:", error);
      return null;
    }
  };
  
  export const fetchCodeforcesStats = async (username) => {
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
      const data = await response.json();
      if (data.status === "OK") {
        const user = data.result[0];
        return {
          username,
          rating: user.rating,
          maxRating: user.maxRating,
          rank: user.rank,
          // Note: Codeforces API does not directly return solved problems count.
          // You may need another endpoint or method to fetch this.
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching Codeforces stats:", error);
      return null;
    }
  };