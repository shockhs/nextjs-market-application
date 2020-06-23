import Head from 'next/head';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Balance from '../../components/Profile/Balance/Balance';
import UserProducts from '../../components/Profile/UserProducts/UserProducts';
import { setBalance } from '../../store/actions/auth';
import profileStyles from '../../styles/profile.js';

const Profile = ({ user, authToken, setBalance, isAuthenticated }) => {
    if (!isAuthenticated) {
        return <h2>You need to login first</h2>
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const { name, regDate, email } = user
    const [openButton, setOpenButton] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            await fetch("http://localhost:5000/api/account/", {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    'authorization': authToken
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 400 && res.message === 'Account is not opened') {
                        setOpenButton(true)
                    }
                    else if (res.status === 200) {
                        setBalance(res.balance)
                        setOpenButton(false)
                    }
                })
        }
        fetchData()
    }, [])

    return <>
        <Head>
            <title>Profile Page</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="profile">
            <header>
                <div className="image">
                    <img src="/noavatar.png" alt="" />
                </div>
                <div className="description">
                    <div className="item">
                        <span className="title">Name:</span>
                        <span>{name}</span>
                    </div>
                    <div className="item">
                        <span className="title">Email:</span>
                        <span>{email}</span>
                    </div>
                    <div className="item">
                        <span className="title">Registration Date:</span>
                        <span>{new Date(regDate).toLocaleDateString("en-US", options)}</span>
                    </div>
                    <div className="item">
                        <span className="title">Last visit:</span>
                        <span>{new Date(Date.now()).toLocaleDateString("en-US", options)}</span>
                    </div>
                </div>
                <Balance
                    openButton={openButton}
                    setOpenButton={setOpenButton}
                    authToken={authToken} />
            </header>
            <UserProducts />
            <style jsx>
                {profileStyles}
            </style>
        </main>
    </>
}




export default connect(state => state.auth, { setBalance })(Profile)