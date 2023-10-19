using System.Text.Json;
using Microsoft.Exchange.WebServices.Data;
using Microsoft.Exchange.WebServices.Autodiscover;

if (Environment.GetCommandLineArgs().Length != 3)
{
    Console.WriteLine("Error: Please provide the M365 email and password!");
    Console.WriteLine("Usage: m365-exchange-ews-auth.exe M365_EMAIL M365_PASSWORD");
    Environment.Exit(1);
}

string M365CredentialsEmail = Environment.GetCommandLineArgs()[1];
string M365CredentialsPwd = Environment.GetCommandLineArgs()[2];

ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2013);
string retEWS = GetExchangeEWSAuth(M365CredentialsEmail, M365CredentialsPwd);
Console.WriteLine(retEWS);

Environment.Exit(0);

string GetExchangeEWSAuth(string M365CredentialsEmail, string M365CredentialsPwd)
{
    DateTime dStart = DateTime.Now;

    string serviceUrl = "Unknown";
    string serviceUserAgent = "Unknown";
    string serverInfoVersion = "Unknown";
    string status = "Success";
    int statusCode = 500;

    string returnMsg = "";

    try
    {
        service.Credentials = new WebCredentials(M365CredentialsEmail, M365CredentialsPwd);
        //service.TraceEnabled = true;
        service.AutodiscoverUrl(M365CredentialsEmail, RedirectionUrlValidationCallback);
        //service.Url = new Uri("https://outlook.office365.com/ews/exchange.asmx");

        Folder f = Folder.Bind(service, WellKnownFolderName.Inbox);
        if (service.ServerInfo != null)
        {
            serverInfoVersion = service.ServerInfo.VersionString;
        }

        serviceUserAgent = service.UserAgent;
        serviceUrl = service.Url.ToString();

        statusCode = 200;
    }
    catch (Exception ex)
    {
        status = ex.Message;
    }

    DateTime dEnd = DateTime.Now;
    TimeSpan ts = dEnd - dStart;

    var item = new
    {
        DurationEWSUserAuth = ts.TotalMilliseconds,
        ServiceUrl = serviceUrl,
        ServiceUserAgent = serviceUserAgent,
        Status = status,
        StatusCode = statusCode
    };

    string jsonString = JsonSerializer.Serialize(item);

    return jsonString;
}

bool RedirectionUrlValidationCallback(string redirectionUrl)
{
    // The default for the validation callback is to reject the URL.
    bool result = false;

    Uri redirectionUri = new Uri(redirectionUrl);

    // Validate the contents of the redirection URL. In this simple validation
    // callback, the redirection URL is considered valid if it is using HTTPS
    // to encrypt the authentication credentials. 
    if (redirectionUri.Scheme == "https")
    {
        result = true;
    }
    return result;
}
