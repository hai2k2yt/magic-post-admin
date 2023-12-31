import React, { useState } from 'react';
import ROLES from './Role';
import { createTransactionLeader, createGatheringLeader, createGatheringStaff, createTransactionStaff } from '../../api/user';

const role = localStorage.getItem('role');
const mail = localStorage.getItem('mail');
const phone = localStorage.getItem('phone');
const name = localStorage.getItem('name');
const pointId = localStorage.getItem('pointId');

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [point, setPoint] = useState('');
    const [confirmPassErr, setConfirmPassErr] = useState('');
    const validateName = (value) => {
        var regex = /(^[A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]{2,16})([ ]{0,1})([A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]{2,16})?([ ]{0,1})?([A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]{2,16})?([ ]{0,1})?([A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]{2,16})$/;
        if (regex.test(value) || value === '') {
            setUsername(value);
            setNameErr('');
        } else {
            setNameErr('Tên không được chứa số, ký tự đặc biệt');
        }
    }

    const validateEmail = (value) => {
        var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (regex.test(value) || value === '') {
            setEmail(value);
            setEmailErr('');
        } else {
            setEmailErr('Vui lòng nhập đúng định dạng')
        }

    }
    const validatePassword = (value) => {
        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
        if (regex.test(value) || value === '') {
            setPassword(value);
            setPassErr('');
            ;
        } else {
            setPassErr('Mật khẩu cần tối thiểu 6 ký tự, trong đó có tối thiểu 1 chữ số, 1 chữ hoa và 1 chữ thường');
        }
    }
    const validateConfirmPass = (value) => {
        if (value === password) {
            setConfirmPassErr('');
        } else {
            setConfirmPassErr('Mật khẩu không khớp');
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (passErr !== '' || emailErr !== '' || nameErr !== '' || confirmPassErr !== '') {

        } else {
            try {
                console.log(role, point, type, email, phone);
                if (role === ROLES[1]) {
                    // Xử lý tạo tài khoản nhân viên điểm tập kết
                    setType('GATHERING_STAFF');
                    const res = await createGatheringStaff(pointId, { username, email, password, phone });
                    console.log(res)

                } else if (role === ROLES[2]) {
                    // Xử lý tạo tài khoản nhân viên điểm giao dịch
                    setType('TRANSACTION_STAFF');
                    const res = await createTransactionStaff(pointId, { username, email, password, phone });
                    console.log(res)

                } else if (role === ROLES[0] && type === 'GATHERING_LEADER') {
                    // Xử lý tạo tài khoản trưởng điểm tap ket
                    const res = await createGatheringLeader(point, { username, email, password, phone });
                    console.log(res)
                } else {
                    // Xử lý tạo tài khoản trưởng điểm giao dich
                
                    const res = await createTransactionLeader(point, { username, email, password, phone });
                    console.log(res)
                }
            } catch (e) {
                console.log(e)
            }
        }
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };


    return (
        <form className="m-5 max-h-screen" onSubmit={handleRegister}>
            <div className="mb-6">
                <label htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nguyễn Văn A"
                    onChange={(e) => validateName(e.target.value)} required />
                {
                    nameErr && <p className="mt-2 text-warning text-xs italic">{nameErr}</p>
                }
            </div>
            <div className="mb-6">
                <label htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0912345678"
                    onChange={(e) => setPhone(e.target.value)} maxLength="10"
                    required />

            </div>
            <div className="mb-6">
                <label htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="int3306@vnu.edu.vn"
                    onChange={(e) => validateEmail(e.target.value)} required />
                {
                    emailErr && <p className="mt-2 text-warning text-xs italic">{emailErr}</p>
                }
            </div>
            <div className="mb-6">
                <label htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••"
                    onChange={(e) => validatePassword(e.target.value)} required />
                {
                    passErr && <p className="mt-2 text-warning text-xs italic">{passErr}</p>
                }
            </div>
            <div className="mb-6">
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
                <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => validateConfirmPass(e.target.value)} placeholder="•••••••••" required></input>
                {
                    confirmPassErr && <p className="mt-2 text-warning text-xs italic">{confirmPassErr}</p>
                }
            </div>
            <div className="mb-6">


                {role === ROLES[0] && (
                    <>
                        <div className="mb-6">
                            <label htmlFor="type"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại tài khoản</label>
                            <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={type} onChange={handleTypeChange} required>
                                <option value="">Chọn loại tài khoản</option>
                                <option value="TRANSACTION_LEADER" >Trưởng điểm giao dịch</option>
                                <option value="GATHERING_LEADER" >Trưởng điểm tập kết</option>
                            </select>
                        </div>
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn điểm giao dịch/tập kết</label>
                        <input type="text" id="pointId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={point}
                            onChange={(e) => setPoint(e.target.value)} required></input>
                    </>
                )}
            </div>

            <button type="submit"
                className="flex text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Tạo tài khoản
            </button>
        </form>
    );
};

export default Register;