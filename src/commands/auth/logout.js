module.exports = {
  name: 'logout',
  command: logout,
  help: [
    'Logout from current Dat registry server',
    'Usage: dat logout [<registry>]',
    '',
    'Specify server if you want to from non-active other server.',
    'Check active server with `dat whoami`.'
  ].join('\n'),
  options: [
    {
      name: 'server',
      help: 'Server to log out of. Defaults to active login.'
    }
  ]
}

function logout (opts) {
  const chalk = require('chalk')
  const Registry = require('../../registry')

  if (opts._[0]) opts.server = opts._[0]

  const client = Registry(opts)

  const whoami = client.whoami()
  if (!whoami || !whoami.token) return exitErr('Not currently logged in to that server.')
  client.logout(err => {
    if (err) return exitErr(err)
    console.log(`Logged out of ${chalk.green(whoami.server)}`)
    process.exit(0)
  })
}

function exitErr (err) {
  console.error(err)
  process.exit(1)
}
