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
