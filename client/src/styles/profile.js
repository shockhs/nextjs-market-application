import css from 'styled-jsx/css'

export default css.form`
.profile {
  margin-top: 20px;
  width: 100%;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: 200px 1fr;
      grid-template-rows: 200px 1fr;
}

header {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 30% 40% 30%;
      grid-template-columns: 30% 40% 30%;
  border: 2px solid #000000;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

.image {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.image img {
  width: 180px;
  height: 180px;
}

.description {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}

.item + .item {
  margin-top: 15px;
}

.title {
  font-weight: 700;
  margin-right: 20px;
}

/*# sourceMappingURL=profile.css.map */
`