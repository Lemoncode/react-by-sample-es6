import * as React from 'react';
import memberAPI from './api/memberAPI';
import MemberRow from './memberRow';

class MembersTable extends React.Component {

  constructor(props) {
    super(props);
    // set initial state
    this.state = { members: [] };
  }

  // Standard react lifecycle function:
  // https://facebook.github.io/react/docs/component-specs.html
  componentWillMount() {
    this.setState({ members: memberAPI.getAllMembers() });
  }

  render() {
    return (
      <div>
        <h2>Members Page</h2>
        <table className="table">
          <thead>
            <tr>
              <th>
                Avatar
              </th>
              <th>
                Id
              </th>
              <th>
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.members.map(member =>
                <MemberRow key={member.id} member={member} />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default MembersTable;
