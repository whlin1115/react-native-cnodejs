import React from 'react';
import { connect } from 'dva/mobile';
import { Link } from 'dva/router';
import * as service from './service';
import { Card, Layout } from '../../components';
import { plates, avators } from '../../config';
import '../../assets/font/iconfont.css';
import './style.css';

const { Wrap } = Card;
const { Header, Navbar, Loading } = Layout;

class Home extends React.PureComponent {

  componentDidMount() {
    const { params } = this.props;
    const { plate } = params;
    const { cache } = service.cacheControl({ plate });
    if (cache) this.props.cache(cache);
    else this.props.query(params);
  }

  componentWillReceiveProps(next) {
    const { params } = this.props;
    const { plate } = params;
    if (next.params !== params) {
      const { cache } = service.cacheControl({ plate });
      if (cache) this.props.cache(cache);
      else this.props.query(params);
    }
  }

  render() {
    const { data, loading } = this.props;
    const navbarProps = { datas: plates };
    const wrapProps = { data, loading };

    return (
      <div className="home">
        <Header >
          <div className="title">虎扑社区</div>
          <div className="right">
            <Link to="search">
              <div className="button">
                <i className="icon iconfont icon-sousuo" />
              </div>
            </Link>
            <div className="avator">
              <img src={avators[Math.floor(Math.random() * 30)]} alt="头像" />
            </div>
          </div>
        </Header>
        <Navbar {...navbarProps} />
        <Loading type="cylon" loading={loading} />
        <Wrap {...wrapProps} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { data, loading } = state.home;
  return { data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'home/query',
        payload: params,
      });
      dispatch({
        type: 'home/init',
      });
    },
    cache(params) {
      dispatch({
        type: 'home/cache',
        payload: params,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
