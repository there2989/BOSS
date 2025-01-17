import React, { useState, useEffect, useContext  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../../store/management';
import { fetchMembersPw } from '../../store/management';
import classes from './EduSsafyLogin.module.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/ErrorModal/ErrorModal';
import { SsafyLoginContext } from '../../App';

//memberLoginPw
export default function Main() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.management.data);
  const membersPw = useSelector((state) => state.management.membersPw);
  const [memberId, setMemberId] = useState('');
  const [memberLoginPw, setMemberLoginPw] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const { setSsafyLogin } = useContext(SsafyLoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드 시 멤버 데이터 불러오기
    dispatch(fetchMembers());
    dispatch(fetchMembersPw());
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!memberId) {
      setErrorMessage('[아이디]은(는) 필수값입니다.');
      return;
    } else if (!memberLoginPw) {
      setErrorMessage('[비밀번호]은(는) 필수값입니다.');
      return;
    }
    console.log(members);
    console.log(membersPw);

    // 입력된 memberId로 멤버 찾기
    const member = members.find((m) => m.memberId === parseInt(memberId));

    if (member) {
      // membersPw에서 입력된 비밀번호와 일치하는지 확인
      const isPasswordCorrect = membersPw.some((pwData) => pwData.memberLoginPw === memberLoginPw);

      if (isPasswordCorrect) {
        console.log('로그인 성공:', member);
        setSsafyLogin(true);
        navigate('/edussafy', { state: { member } });
      } else {
        setErrorMessage('아이디 또는 비밀번호를 잘못 입력했습니다.');
      }
    } else {
      setErrorMessage('아이디 또는 비밀번호를 잘못 입력했습니다.');
    }
  };

  const closeModal = () => {
    setErrorMessage(null);
  };

  return (
    <div className={`${classes['main-container']} ${classes['intro-visual-bg']}`}>
      {/* <div className={classes['rectangle']} /> */}
      <div className={classes['rectangle-1']}>
        <span className={classes['privacy-policy']}>
          개인정보처리방침
        </span>
        <span className={classes['copyright-samsung']}>
          Copyright@ SAMSUNG All Rights Reserved.
        </span>
      </div>
      {/* <div className={classes['intro-visual-bg']} /> */}
      <div className={classes['center']}>
        <form onSubmit={handleLogin}>
          <div className={classes['rectangle-2']}>
            <div className={classes['logo']} />
            <span className={classes['id']}>아이디</span>
            <input 
              type='text' 
              placeholder="ID" 
              className={classes['inputText']}
              id="memberId"
              value={memberId} 
              onChange={(e) => setMemberId(e.target.value)}
            />
            <span className={classes['password']}>비밀번호</span>
            <input 
              type='password' 
              placeholder="PASSWORD" 
              className={classes['inputText']} 
              id="memberLoginPw"
              value={memberLoginPw}
              onChange={(e) => setMemberLoginPw(e.target.value)}
            />

            <button className={classes['rectangle-5']}>
              <span className={classes['login']}>로그인</span>
            </button>
            <span className={classes['password-recovery']}>비밀번호 찾기</span>
            <div className={classes['rectangle-6']} />

            {/* {errorMessage && <div className={classes.errorBox}>{errorMessage}</div>} */}
            
            <span className={classes['id-save']}>아이디 저장</span>
          </div>
        </form>
        
        <span className={classes['samsung-sw-academy']}>
          SAMSUNG SW ACADEMY
          <br />
          FOR YOUTH
        </span>
        <span className={classes['ssafy-welcome']}>SSAFY에 오신것을 환영합니다.</span>
      </div>
      <Modal message={errorMessage} onClose={closeModal} />
    </div>
  );
}
