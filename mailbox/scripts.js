var Email = React.createClass({
  render: function() {
    return (
      <div className="email">
        <dl className="meta dl-horizontal">
          <dt>From</dt>
          <dd>{this.props.from}</dd>

          <dt>To</dt>
          <dd>{this.props.to}</dd>

          <dt>Subject</dt>
          <dd>{this.props.subject}</dd>
        </dl>
        <div className="body" dangerouslySetInnerHTML={{__html: this.props.body}}></div>
      </div>
    );
  }
});

var EmailListItem = React.createClass({
  render: function() {
    return (
      <tr onClick={this.props.on_click.bind(null)}>
        <td>{this.props.subject}</td>
        <td>{this.props.from}</td>
        <td>{this.props.to}</td>
      </tr>
    );
  }
});

var EmailList = React.createClass({
  render: function() {
    var email_list = this.props.emails.map(function(mail) {
      return (
        <EmailListItem key={mail.id}
                       from={mail.from}
                       to={mail.to}
                       subject={mail.subject}
                       on_click={this.props.onSelectEmail.bind(null, mail.id)} />
      );
    }.bind(this));

    return (
      <table className="email-list table table-striped table-condensed">
        <thead>
          <tr>
            <th>Subject</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {email_list}
        </tbody>
      </table>
    );
  }
});

var NoneSelected = React.createClass({
  render: function() {
    return (
      <div className="none-selected alert alert-warning" role="alert">
        <span>No {this.props.text} selected.</span>
      </div>
    );
  }
});

var Mailbox = React.createClass({
  getInitialState: function(){
    return { email_id: null };
  },

  handleSelectEmail: function(id) {
    this.setState({ email_id: id });
  },

  render: function() {
    var email_id = this.state.email_id;
    if (email_id) {
      var mail = this.props.emails.filter(function(mail) {
        return mail.id == email_id;
      })[0];
      selected_email = <Email id={mail.id}
                              from={mail.from}
                              to={mail.to}
                              subject={mail.subject}
                              body={mail.body} />;
    } else {
      selected_email = <NoneSelected text="email" />;
    }

    return (
      <div>
        <EmailList emails={this.props.emails}
                   onSelectEmail={this.handleSelectEmail} />
        <div className="email-viewer">
          {selected_email}
        </div>
      </div>
    );
  }
});

var MailboxList = React.createClass({
  render: function() {
    var mailbox_list = this.props.mailboxes.map(function(mailbox) {
      return (
        <li className="list-group-item"
            key={mailbox.id}
            onClick={this.props.onSelectMailbox.bind(null, mailbox.id)}>
          <span className="badge">
            {mailbox.emails.length}
          </span>
          {mailbox.name}
        </li>
      );
    }.bind(this));

    return (
      <div className="col-md-2">
        <ul className="mailboxes list-group">
          {mailbox_list}
        </ul>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function(){
    return { mailbox_id: null };
  },

  handleSelectMailbox: function(id) {
    this.setState({ mailbox_id: id });
  },

  render: function() {
    var mailbox_id = this.state.mailbox_id;
    if (mailbox_id) {
      var mailbox = this.props.mailboxes.filter(function(mailbox) {
        return mailbox.id == mailbox_id;
      })[0];
      selected_mailbox = <Mailbox key={mailbox.id}
                                  emails={mailbox.emails} />;
    } else {
      selected_mailbox = <NoneSelected text="mailbox" />;
    }

    return (
      <div className="app row">
        <MailboxList mailboxes={this.props.mailboxes}
                     onSelectMailbox={this.handleSelectMailbox} />
        <div className="mailbox col-md-10">
          <div className="panel panel-default">
            <div className="panel-body">
              {selected_mailbox}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var fixtures = [
  {
    id: 1,
    name: "Inbox",
    emails: [
      {
        id: 1,
        from: "joe@tryolabs.com",
        to: "fernando@tryolabs.com",
        subject: "Meeting",
        body: "hi"
      },
      {
        id: 2,
        from: "newsbot@tryolabs.com",
        to: "fernando@tryolabs.com",
        subject: "News Digest",
        body: "<h1>Intro to React</h1> <img src='https://raw.githubusercontent.com/wiki/facebook/react/react-logo-1000-transparent.png' width=300/)>"
      }
    ]
  },
  {
    id: 2,
    name: "Spam",
    emails: [
      {
        id: 3,
        from: "nigerian.prince@gmail.com",
        to: "fernando@tryolabs.com",
        subject: "Obivous 419 scam",
        body: "You've won the prize!!!1!1!!!"
      }
    ]
  }
];

React.render(
  <App mailboxes={fixtures} />,
  document.body
);
