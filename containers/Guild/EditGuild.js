import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { useSelector, useDispatch } from 'react-redux';
import withPrivateRoute from 'hocs/withPrivateRoute';
import redirectAfterLogout from 'services/redirectAfterLogout';

import { getGuild } from 'actions/guildActions';
import { guildSelector, authSelector } from 'reducers/selectors';

import Loading from 'components/layouts/Loading';
import { isEmail, isPhoneNumber } from 'utils/validate';
import EditGuildForm from './EditGuildForm';

const EditGuild = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { guildID } = router.query;

  const { isAuthenticated } = useSelector(authSelector);
  if (!isAuthenticated) {
    redirectAfterLogout();
  }

  useEffect(() => {
    dispatch(getGuild.request(guildID));
  }, []);

  const { guildDetail, loading } = useSelector(guildSelector);
  const guildDetailLoaded = !isEmpty(guildDetail);

  return loading || !guildDetailLoaded ? (
    <Loading />
  ) : (
    <div id='edit-guild' className='guild'>
      <div className='title'>{'Sửa thông tin bang'}</div>
      <div className='edit-guild'>
        <EditGuildForm guild={guildDetail} />
      </div>
    </div>
  );
};

export default withPrivateRoute(EditGuild);
