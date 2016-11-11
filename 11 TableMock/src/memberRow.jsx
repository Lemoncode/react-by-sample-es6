import * as React from 'react';

const MemberRow = props => (
  <tr>
    <td>
      <img src={props.member.avatar_url} style={{ maxWidth: '150px' }} alt="Avatar" />
    </td>
    <td>
      <span>{props.member.id}</span>
    </td>
    <td>
      <span>{props.member.login}</span>
    </td>
  </tr>
);

MemberRow.propTypes = {
  // Is impossible to use:
  //   member: React.PropTypes.instanceOf(MemberEntity),
  // with _clone().
  member: React.PropTypes.shape({
    id: React.PropTypes.number,
    avatar_url: React.PropTypes.string,
    login: React.PropTypes.string,
  }),
};

export default MemberRow;
