import React, { useState, useEffect } from 'react';
import Link from 'components/LinkMaster';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Select from 'react-select';

import withPrivateRoute from 'hocs/withPrivateRoute';

import { updateGuild } from 'actions/guildActions';
import { isEmail, isPhoneNumber, isFacebookLink } from 'utils/validate';

import provinces from 'utils/provinces';

const EditGuildForm = ({ guild }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    game_server: guild.game_server || '',
    email: guild.email || '',
    phone: guild.phone || '',
    facebook_user_link: guild.facebook_user_link || '',
    facebook_group_link: guild.facebook_group_link || '',
    province: guild.province || provinces[0].value,
    slogan: guild.slogan || '',
    description: guild.description || '',
  });

  const {
    game_server,
    email,
    phone,
    facebook_user_link,
    facebook_group_link,
    province,
    slogan,
    description,
  } = formData;

  const [formErrors, setFormErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState(provinces.find((option) => option.value == province));

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
    facebook_user_link: {
      is_required: true,
      is_facebook_link: true,
      error: 'Link FB cá nhân của Bang Chủ không được để trống',
      error_facebook_link: 'Link FB cá nhân của Bang Chủ không phải link facebook',
    },
    facebook_group_link: {
      is_required: true,
      is_facebook_link: true,
      error: 'Link FB group Bang của Bang Chủ không được để trống',
      error_facebook_link: 'Link FB group Bang của Bang Chủ không phải link facebook',
    },
    slogan: {
      is_required: true,
      error: 'Khẩu hiện bang không được để trống',
      is_valid_max_length: true,
      error_max_length: 'Khẩu hiệu bang hội không được dài quá 500 ký tự',
    },
    description: {
      is_required: true,
      error: 'Tổng quan nội quy bang không được để trống',
      is_valid_max_length: true,
      error_max_length: 'Tổng quan, nội quy bang không được dài quá 500 ký tự',
    },
  };

  const validateSingleField = (fieldData) => {
    const { fieldName, fieldValue } = fieldData;
    const curValidateConfig = validateConfig[fieldName];

    if (!curValidateConfig) {
      return {
        is_valid: true,
        error: '',
      };
    }

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

    if (curValidateConfig.is_facebook_link && !isFacebookLink(fieldValue)) {
      return {
        is_valid: false,
        error: curValidateConfig.error_facebook_link,
      };
    }

    if (curValidateConfig.is_valid_length && fieldValue.length > 50) {
      return {
        is_valid: false,
        error: curValidateConfig.error_length,
      };
    }

    if (curValidateConfig.is_valid_max_length && fieldValue.length > 500) {
      return {
        is_valid: false,
        error: curValidateConfig.error_max_length,
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateCreateGuild(formData);
    if (Object.keys(errors).length == 0) {
      dispatch(updateGuild.request(guild._id, formData));
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='fun-form' id='funtap-guild-edit-form'>
      <div className='form-group'>
        <input type='text' placeholder='' name='' defaultValue={guild.game_name} readOnly />
      </div>
      <div className={`form-group ${formErrors.game_server ? 'has-error' : ''}`}>
        <input
          type='text'
          placeholder='Nhập server bạn đang chơi'
          name='game_server'
          value={game_server}
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
      <div className={`form-group for-facebook ${formErrors.facebook_user_link ? 'has-error' : ''}`}>
        <span className='fun-ic ic-facebook-round'></span>
        <input
          type='text'
          placeholder='(*) Link FB cá nhân của Bang Chủ'
          name='facebook_user_link'
          value={facebook_user_link}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={`form-group for-facebook ${formErrors.facebook_group_link ? 'has-error' : ''}`}>
        <div className='ic-wrap'>
          <span className='fun-ic ic-users-white'></span>
        </div>
        <input
          type='text'
          placeholder='(*) Link FB group Bang của Bang Chủ'
          name='facebook_group_link'
          value={facebook_group_link}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='form-group'>
        <Select
          name='province'
          className='select-2'
          classNamePrefix='select-2'
          value={selectedOption}
          onChange={(selectedOption) => {
            setSelectedOption(selectedOption);
            setFormData({ ...formData, province: selectedOption.value });
          }}
          options={provinces}
        />
      </div>
      <div className={`form-group ${formErrors.slogan ? 'has-error' : ''}`}>
        <label htmlFor='slogan'>{'(*) Khẩu hiệu'}</label>
        <TextareaAutosize
          type='text'
          name='slogan'
          minRows={2}
          maxRows={6}
          value={slogan}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={`form-group ${formErrors.description ? 'has-error' : ''}`}>
        <label htmlFor='description'>{'(*) Tổng quan, nội quy bang'}</label>
        <TextareaAutosize
          type='text'
          minRows={4}
          maxRows={8}
          name='description'
          value={description}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {formErrors && (
        <div className='alert-error'>
          {Object.values(formErrors).map((error, key) => (error ? <span key={key}>{error}</span> : ''))}
        </div>
      )}
      <div className='form-group actions'>
        <Link href='/guilds/[guildID]' as={`/guilds/${guild._id}`}>
          <a className='fun-btn cancel'>{'Hủy'}</a>
        </Link>
        <button type='submit' className='fun-btn submit'>
          {'Lưu cập nhật'}
        </button>
      </div>
    </form>
  );
};

export default withPrivateRoute(EditGuildForm);
