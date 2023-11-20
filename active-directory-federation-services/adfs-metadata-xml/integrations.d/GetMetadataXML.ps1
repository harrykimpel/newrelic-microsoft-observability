add-type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy

$metadataUrl = "https://localhost/FederationMetadata/2007-06/FederationMetadata.xml"
$result = Invoke-WebRequest $metadataUrl -UseBasicParsing

# Build a custom object to pass into the results
$jsonResult = [ PSCustomObject ]@{

    metadataXMLURL    = $metadataUrl
    statusCode        = $result.StatusCode 
    statusDescription = $result.StatusDescription 
    rawContentLength  = $result.RawContentLength

}

$jsonResult | ConvertTo-Json