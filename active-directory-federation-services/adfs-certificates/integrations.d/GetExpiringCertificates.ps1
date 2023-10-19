$expiring_certs = Get-ChildItem -Path cert: -Recurse -ExpiringInDays 365  | Select-Object Issuer, NotBefore, NotAfter, Subject, FriendlyName, SerialNumber, Thumbprint

# Build an empty array to add our results to
$results = @()

$StartDate = (Get-Date)

foreach ($item in $expiring_certs) {

  # Build a custom object to pass into the results
  $cert = [ PSCustomObject ]@{

    certSubject        = $item.Subject
    certIssuer         = $item.Issuer
    #certSerialNumber   = $item.SerialNumber
    certNotBefore      = ( [DateTimeOffset ]$item.NotBefore ).ToUnixTimeSeconds()
    certNotAfter       = ( [DateTimeOffset ]$item.NotAfter ).ToUnixTimeSeconds()
    #certThumbprint     = $item.Thumbprint
    certExpiringIn     = New-TimeSpan -Start $StartDate -End $item.NotAfter
    certExpirationDate = $item.NotAfter | Get-Date -Uformat %s
    certFriendlyName   = $item.FriendlyName
  }

  $results += $cert
}

$results | ConvertTo-Json 
