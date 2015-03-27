The app we want to design is basically a React clone of the email client in
Ember's home page. It won't send email, or communicate with a backend to pull a
list of emails, it's just a bit of static data with some Bootstrap styling.

First things first: The `Email` component.

```javascript
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
```

This is just a `div` with a definition list of the various props, nothing that
requires an explanation.. We embed the raw HTML body using React's
`dangerouslySetInnerHTML`.

Now, the list of emails. Which is actually rendered as a table, but semantically
is a list. Let's first go through the list itself:

```javascript
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
```

The render function iterates over the email list, collecting (Or it 'maps over')
`<EmailListItem>` components, passing some initial props to them. There are two
props here that matter:

* `key`: This is a prop that you pass to every list item when building lists in
  react. It can simply be the index (Which the `map` function provides), or a
  more domain-specific identifier.

* `on_click`: This prop sends a function that's passed from even higher up down
  to the `<EmailListItem>`. We use `bind` to partially apply the function.

Now, the `<EmailListItem>` component looks like this:

```javascript
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
```

Here we use React's `onClick` prop to declare that when that table row is
clicked, the `on_click` prop should be called.

Here we take a slight detour to make a small, reusable component. We use this
whenever we let the user choose an element from a list, to represent the initial
state when no element is chosen. The `<NoneSelected>` component uses a single
prop, `text`.

```javascript
var NoneSelected = React.createClass({
  render: function() {
    return (
      <div className="none-selected alert alert-warning" role="alert">
        <span>No {this.props.text} selected.</span>
      </div>
    );
  }
});

Now, we build a Mailbox component we can use to display the current email and
the list of emails. The `<Mailbox>` has only one item of state: The ID of the
selected email, which is either a natural number or null. A method,
`handleSelectEmail`, will be passed down the component hierarchy as a callback
for the `onClick` event of an `<EmailListItem>` instance.

The `render` functions is very simple: If an email is selected, it filters its
data out of the props and instantiates a corresponding `<Email>` component. If
it isn't, the "email" is just an instance of `<NoneSelected>`. Then the email
list and selected email are displayed.

```javascript
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
```
