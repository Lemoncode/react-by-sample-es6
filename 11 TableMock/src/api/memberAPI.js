import MembersMockData from './memberMockData';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {
  // This would be performed on the server in a real app. Just stubbing in.
  static _clone(item) {
    return (
      // return cloned copy so that the item is passed by value instead of by reference
      JSON.parse(JSON.stringify(item))
    );
  }

  // Just return a copy of the mock data
  getAllMembers() {
    return (
      MemberAPI._clone(MembersMockData)
    );
  }
}

const memberAPI = new MemberAPI();

export default memberAPI;
