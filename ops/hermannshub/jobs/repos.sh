set -euo pipefail
backup=/var/backups/hermann-maintenance/2026-10-21
sudo install -d -m 700 "$backup"
if ! sudo test -f "$backup/githubcli-keyring.gpg"; then sudo cp /usr/share/keyrings/githubcli-archive-keyring.gpg "$backup/githubcli-keyring.gpg"; fi
keyfile=$(mktemp)
trap 'rm -f "$keyfile"' EXIT
curl -fsSL --max-time 30 https://cli.github.com/packages/githubcli-archive-keyring.gpg -o "$keyfile"
printf '6084d5d7bd8e288441e0e94fc6275570895da18e6751f70f057485dc2d1a811b  %s\n' "$keyfile" | sha256sum -c -
gpg --show-keys --with-colons "$keyfile" | grep -F 7F38BBB59D064DBCB3D84D725612B36462313325
sudo install -m 644 "$keyfile" /usr/share/keyrings/githubcli-archive-keyring.gpg
sudo apt-get -o APT::Update::Error-Mode=any update -qq
