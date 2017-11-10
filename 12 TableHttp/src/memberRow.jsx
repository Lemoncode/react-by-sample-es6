import * as React from 'react';
import PropTypes from 'prop-types';

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
  member: PropTypes.shape({
    id: PropTypes.number,
    avatar_url: PropTypes.string,
    login: PropTypes.string,
  }),
};

export default MemberRow;
