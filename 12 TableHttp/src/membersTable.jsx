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
    memberAPI.getAllMembers().then(members =>
      this.setState({members: members})
    );
  }

  render() {
    return (
      <div className="row">
        <h2> Members Page</h2>
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
              this.members.map(member =>
                <MemberRow key={'foobar'} member={member} />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default MembersTable;
