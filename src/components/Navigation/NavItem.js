import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import styled, { css } from 'styled-components';

const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 1rem 1rem;
  height: 35px;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  &:hover {
      background: #fab129;
  }
  &:focus {
      outline: none;
  }

  ${props => props.active && css`
    background: #fab129;
    border-color: #fab129;
    &:hover {
            background: transparent;
    }
  `}
`

class NavItem extends Component {

    render() {
        return (
            <Button
                active={this.props.label === this.props.view}
                onClick={() => this.props.onSelectView(this.props.label)} >
                {this.props.label}
            </Button>
        );
    }
}

const mapStateToProps = state => {
    return {
        view: state.selectedView,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectView: (view) => dispatch(actions.switchView(view)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavItem);