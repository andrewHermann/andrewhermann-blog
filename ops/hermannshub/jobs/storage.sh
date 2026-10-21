set -euo pipefail
for disk in /dev/sda /dev/sdb /dev/sdc; do
 sudo smartctl -H -A "$disk" | grep -E 'overall-health|Reallocated|Pending|Uncorrectable|CRC_Error'
 sudo smartctl -t short "$disk"
done
cat /proc/mdstat
echo 'ATTENTION: short tests started. Refresh health after the tests complete; /dev/sdc has 9 reallocated sectors.'
