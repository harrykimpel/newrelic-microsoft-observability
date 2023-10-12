$expiring_certs = Get-ChildItem -Path cert: -Recurse -ExpiringInDays 30

# Build an empty array to add our results to
$results = @()

foreach ($item in $expiring_certs) {

  # Build a custom object to pass into the results
  $cert = [ PSCustomObject ]@{

    certSubject      = $item.Subject
    certIssuer       = $item.Issuer
    certSerialNumber = $item.SerialNumber
    certNotBefore    = ( [DateTimeOffset ]$item.NotBefore ).ToUnixTimeSeconds()
    certNotAfter     = ( [DateTimeOffset ]$item.NotAfter ).ToUnixTimeSeconds()
    certThumbprint   = $item.Thumbprint

  }

  $results += $cert
}

$results | ConvertTo-Json