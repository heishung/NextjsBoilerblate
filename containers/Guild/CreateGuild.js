import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'components/LinkMaster';
import ReactModal from 'react-modal';

import withPrivateRoute from 'hocs/withPrivateRoute';
import redirectAfterLogout from 'services/redirectAfterLogout';

import { getGames } from 'actions/gameActions';
import { createGuild, resetCreatedGuild } from 'actions/guildActions';
import { gameSelector, guildSelector, authSelector } from 'reducers/selectors';

import Loading from 'components/layouts/Loading';
import { isEmail, isPhoneNumber } from 'utils/validate';

// import 'styles/pages/guild.scss';

const CreateGuild = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameAlias } = router.query;

  const { isAuthenticated } = useSelector(authSelector);
  if (!isAuthenticated) {
    redirectAfterLogout();
  }

  const { games, loading } = useSelector(gameSelector);
  const { createdGuild } = useSelector(guildSelector);
  const game = games.find((game) => game.alias == gameAlias);
  const [formData, setFormData] = useState({
    game_server: '',
    guild_name: '',
    email: '',
    phone: '',
  });

  const { game_server, guild_name, email, phone } = formData;

  const [formErrors, setFormErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getGames.request());
  }, []);

  const validateConfig = {
    game_server: {
      is_required: false,
    },
    guild_name: {
      is_required: true,
      error: 'Tên bang hội không được để trống',
      is_valid_length: true,
      error_length: 'Tên bang hội không được dài quá 50 ký tự',
    },
    email: {
      is_required: true,
      is_email: true,
      error_email: 'Email không đúng định dạng',
      error: 'Email không được để trống',
    },
    phone: {
      is_required: true,
      is_phone: true,
      error_phone: 'Số điện thoại không đúng định dạng',
      error: 'Số điện thoại không được để trống',
    },
  };

  const validateSingleField = (fieldData) => {
    const { fieldName, fieldValue } = fieldData;
    const curValidateConfig = validateConfig[fieldName];

    if (curValidateConfig.is_required && fieldValue === '') {
      return {
        is_valid: false,
        error: curValidateConfig.error,
      };
    }
    if (curValidateConfig.is_phone && !isPhoneNumber(fieldValue)) {
      return {
        is_valid: false,
        error: curValidateConfig.error_phone,
      };
    }
    if (curValidateConfig.is_email && !isEmail(fieldValue)) {
      return {
        is_valid: false,
        error: curValidateConfig.error_email,
      };
    }

    if (curValidateConfig.is_valid_length && fieldValue.length > 50) {
      return {
        is_valid: false,
        error: curValidateConfig.error_length,
      };
    }

    return {
      is_valid: true,
      error: '',
    };
  };

  // TODO: rewrite validate function
  const validateCreateGuild = (formData) => {
    const errors = {};
    for (const key in formData) {
      const validateResult = validateSingleField({
        fieldName: key,
        fieldValue: formData[key],
      });
      if (!validateResult.is_valid) {
        errors[[key]] = validateResult.error;
      }
    }

    return errors;
  };

  const handleResetCreated = (e) => {
    dispatch(resetCreatedGuild());
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateCreateGuild(formData);
    if (Object.keys(errors).length == 0) {
      dispatch(createGuild.request({ ...formData, game_name: game.title, game_id: game.id }));
      if (createGuild) {
        setShowModal(true);
      }
    } else {
      setFormErrors(errors);
    }
  };

  // TODO: redirect to list game when
  return loading || !game ? (
    <Loading />
  ) : (
    <div id='create-guild' className='guild'>
      <div className='title'>
        <span className='fun-ic ic-eback-black' onClick={() => router.back()}></span>
        {'Ghi danh bang hội của bạn'}
      </div>
      <div className='create-guild'>
        <form onSubmit={(e) => handleSubmit(e)} className='fun-form' id='funtap-guild-create-form'>
          <div className='form-group'>
            <input type='text' placeholder='' name='' defaultValue={game.title} readOnly />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Nhập server bạn đang chơi'
              name='game_server'
              value={game_server}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={`form-group ${formErrors.guild_name ? 'has-error' : ''}`}>
            <input
              type='text'
              placeholder='(*) Tên bang'
              name='guild_name'
              value={guild_name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={`form-group ${formErrors.email ? 'has-error' : ''}`}>
            <input
              type='text'
              placeholder='(*) Email'
              name='email'
              value={email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={`form-group ${formErrors.phone ? 'has-error' : ''}`}>
            <input
              type='text'
              placeholder='(*) Số điện thoại'
              name='phone'
              value={phone}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {formErrors && (
            <div className='alert-error'>
              {Object.values(formErrors).map((error) => (
                <span key={error}>{error}</span>
              ))}
            </div>
          )}
          <div className='form-group'>
            <button type='submit' className={`fun-btn valid`}>
              {'Tiếp tục'}
            </button>
          </div>
        </form>
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={showModal}
        overlayClassName='modal-overlay'
        className='modal-created-guild-success-content modal-content'
        contentLabel='onRequestClose Example'
      >
        <div className='model-wrap'>
          <div className='success'>
            <span className='fun-ic ic-check-2'></span>
            {'Tạo bang thành công'}
          </div>
          <div className='guild-image'>
            <img src={game ? game.icon : ''} alt='' />
          </div>
          <div className='guild-info'>
            <div className='game-name'>{`${createdGuild.game_name} - Funtap`}</div>
            <div className='guild-name'>{`Bang: ${createdGuild.guild_name}`}</div>
            {createdGuild.game_server ? (
              <div className='server-name'>{`Server: ${createdGuild.game_server}`}</div>
            ) : null}
          </div>
          <div className='actions'>
            <Link href='/guilds/[guildID]' as={`/guilds/${createdGuild._id}`}>
              <a className='fun-btn' onClick={(e) => handleResetCreated(e)}>
                {'Thông tin chi tiết bang'}
              </a>
            </Link>
          </div>
        </div>
      </ReactModal>
      {/* <Link href='/guilds/create'>
        <a className={`modal-close-btn ${showModal ? 'active' : ''}`} onClick={(e) => handleResetCreated(e)}>
          <span className='fun-ic ic-eclose'></span>
        </a>
      </Link> */}
    </div>
  );
};

export default withPrivateRoute(CreateGuild);
