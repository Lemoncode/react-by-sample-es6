import {} from 'core-js';
import 'whatwg-fetch';
import MemberEntity from '../model/member';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {

  // Just return a copy of the mock data
  getAllMembers() {
    const gitHubMembersUrl = 'https://api.github.com/orgs/lemoncode/members';

    return fetch(gitHubMembersUrl)
      .then(response => this.checkStatus(response))
      .then(response => this.parseJSON(response))
      .then(data => this.resolveMembers(data));
  }

  checkStatus(response) {
    if (!(response.status >= 200 && response.status < 300)) {
      const error = new Error(response.statusText);
      throw error;
    }
    return Promise.resolve(response);
  }

  parseJSON(response) {
    return response.json();
  }

  resolveMembers(data) {
    const members = data.map((gitHubMember) => {
      const member = new MemberEntity();

      member.id = gitHubMember.id;
      member.login = gitHubMember.login;
      member.avatar_url = gitHubMember.avatar_url;

      return member;
    });

    return Promise.resolve(members);
  }
}

const memberAPI = new MemberAPI();

export default memberAPI;
