const cfbd = require('cfb.js');

const defaultClient = cfb.ApiClient.instance;

const ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
ApiKeyAuth.apiKey = "hfcyfCh3nFnMrE6H7t8BexqchMRuSZsQ/kiTA/1cuRhQLxnA5ZYJk2X8QnJmtRwf";
ApiKeyAuth.apiKeyPrefix["Authorization"] = "Bearer";

var api = new cfb.GamesApi();

let year = 2021;
const games = await api.getGames(year);

// // base URL

// api.collegefootballdata.com/