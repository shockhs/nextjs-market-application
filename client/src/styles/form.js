import css from 'styled-jsx/css'

export default css.form`
  h1 {
        letter-spacing: 3px;
        margin-bottom:10px;
    }
    main {
        display:flex;
        width:100%;
        height:90vh;
        flex-direction:column;
        align-items:center;
        justify-content:center;
    }
    form {
        display:flex;
        flex-direction:column;
    }
    label {
        margin-bottom: 10px;
        margin-top:10px;
    }
    input {
        width:200px
    }
    .buttons {
        width: 100%;
        display:flex;
        justify-content:center
    }
    button {
        margin-top:30px;
        outline:none;
        border:none;
        padding: 7px;
        width:100px;
        font-weight:bold;
        color:#fff;
        border-radius:5px;
        background-color:grey;  
    }
`