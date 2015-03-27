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
