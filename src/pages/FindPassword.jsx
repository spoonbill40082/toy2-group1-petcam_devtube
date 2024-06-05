import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import logo from '../assets/header_logo.png';
import { useNavigate } from 'react-router-dom';

export function FindPassword() {
	const [name, setName] = useState('');
	const [channelName, setChannelName] = useState('');
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleFindPassword = async () => {
		try {
			const q = query(
				collection(db, 'users'),
				where('name', '==', name),
				where('channelName', '==', channelName),
				where('email', '==', email)
			);
			const querySnapshot = await getDocs(q);
			if (!querySnapshot.empty) {
				querySnapshot.forEach(doc => {
					const userData = doc.data();
					const foundPassword = userData.password;
					alert(`찾으시는 비밀번호는 "${foundPassword}" 입니다.`);
				});
			} else {
				alert('해당 정보로 등록된 비밀번호가 없습니다.');
			}
		} catch (error) {
			console.error('Error finding password:', error);
			alert('비밀번호를 찾는 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	const handleLoginClick = () => {
		navigate('/login');
	};

	return (
		<>
			<div className="find-password">
				<div className="wrapper">
					<div className="header">
						<img src={logo} alt="header-logo" />
					</div>
					<div className="find-password-content">
						<span className="title">Find password</span>
						<span>비밀번호 찾기</span>
					</div>
					<div className="input-area">
						<input
							className="input-box"
							type="text"
							placeholder="이름을 입력해주세요"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<input
							className="input-box"
							type="text"
							placeholder="채널이름을 입력해주세요"
							value={channelName}
							onChange={e => setChannelName(e.target.value)}
						/>
						<input
							className="input-box"
							type="text"
							placeholder="이메일을 입력해주세요"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>

					<div className="footer">
						<span className="password-login-btn" onClick={handleLoginClick}>
							로그인
						</span>
						<button className="pass-btn" onClick={handleFindPassword}>
							확인
						</button>
					</div>
				</div>
			</div>
		</>
	);
}