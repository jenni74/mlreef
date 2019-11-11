import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar/navbar';
import ProjectContainer from '../projectContainer';
import './commitDetails.css';
import arrowBlue from '../../images/arrow_down_blue_01.svg';
import triangle01 from '../../images/triangle-01.png';
import CommitsApi from '../../apis/CommitsApi';

class CommitDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: {},
      users: [],
      commitId: window.location.href.split('/commit/')[1],
    };
  }

  componentDidMount() {
    const { projectId } = this.props.match.params;
    CommitsApi.getCommitDetails(projectId, this.state.commitId)
      .then((response) => this.setState({ commits: response }));
    CommitsApi.getUsers(projectId)
      .then((response) => this.setState({ users: response }));
  }

  render() {
    const proj = this.props.projects.selectedProject;
    const { authorName } = this.state.commits;
    const commitId = this.state.commits.short_id;
    let avatar = 'https://assets.gitlab-static.net/uploads/-/system/user/avatar/3839940/avatar.png';
    this.state.users.map((user) => (
      user.name === authorName ? avatar = user.avatar_url : ''
    ),);
    return (
      <div id="commits-view-container">
        <Navbar />
        <ProjectContainer project={proj} activeFeature="data" folders={['Group Name', proj.name, 'Data', 'Commits', this.state.commits.short_id]} />
        <br />
        <br />
        <div className="main-content">
          <div className="wrapper">
            <span className="commit-information">
              <span className="commit-authored">
                Commit
                {' '}
                <b>{commitId}</b>
                {' '}
                authored 4 days ago by
              </span>
              <div className="committer-pic">
                <img src={avatar} alt="avatar" />
              </div>
              <span className="author"><b>{authorName}</b></span>
            </span>
            <div className="other-options">
              <div className="btn">
                <a href="#foo">
                  <b>Browse Files</b>
                </a>
              </div>
              <div className="btn">
                <a href="#foo">
                  <b>Options</b>
                  <img className="dropdown-white" src={arrowBlue} alt="" />
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div className="commit-message">
            <span><b>Commit message</b></span>
            <div className="messages">
              <span>{this.state.commits.message}</span>
              <span>More info coming up</span>
            </div>
          </div>
          <hr />
          <p className="stats">
            Showing
            {' '}
            {this.state.commits.stats ? this.state.commits.stats.total : 0}
            {' '}
              files changed with
            <span className="addition">
              {' '}
              {this.state.commits.stats ? this.state.commits.stats.additions : 0}
              {' '}
              additions
            </span>
            {' '}
              and
            <span className="deleted">
              {' '}
              {this.state.commits.stats ? this.state.commits.stats.deletions : 0}
              {' '}
              deletions
            </span>
              . In total 423MB were added
          </p>
          <div>
            <div className="commit-per-date">
              <div className="pipeline-modify-details">
                <div style={{ flex: '1', padding: '1em' }}>
                  <span>file 01.jpg</span>
                  <span className="addition">Added via Pipeline</span>
                  <span>+2.20MB</span>
                </div>
                <div className="filechange-info">
                  <div className="btn btn-background">
                    <a href="#foo">
                      <img className="dropdown-white" src={triangle01} alt="" />
                    </a>
                  </div>
                  <div className="btn btn-background">
                    <a href="#foo">
                      <b>Copy Path</b>
                    </a>
                  </div>
                  <div className="btn btn-background">
                    <a href="#foo">
                      <b>View Files</b>
                    </a>
                  </div>
                </div>
              </div>
              <div className="image-display">
                <div>
                  <span>Source File</span>
                  <div className="grey-area" />
                </div>
                <div>
                  <span className="addition">Added</span>
                  <div className="grey-area" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
  };
}

export default connect(mapStateToProps)(CommitDetails);