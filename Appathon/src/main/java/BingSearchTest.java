// // This sample uses the Apache HTTP client from HTTP Components (http://hc.apache.org/httpcomponents-client-ga/)

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

public class BingSearchTest {
    public static void main(String[] args) throws URISyntaxException, IOException {
        HttpClient httpclient = HttpClients.createDefault();

        URIBuilder builder = new URIBuilder("https://api.cognitive.microsoft.com/bing/v5.0/search");

        builder.setParameter("q", "bill gates");
        builder.setParameter("count", "10");
        builder.setParameter("offset", "0");
        builder.setParameter("mkt", "en-us");
        builder.setParameter("safesearch", "Moderate");

        URI uri = builder.build();
        HttpGetWithEntity request = new HttpGetWithEntity(uri);
        request.setHeader("Ocp-Apim-Subscription-Key", "a43582571a4946d0a3e7afb34d09807d");


        // Request body
        StringEntity reqEntity = new StringEntity("{body}");
        request.setEntity(reqEntity);

        HttpResponse response = httpclient.execute(request);
        HttpEntity entity = response.getEntity();

        if (entity != null) {
            //System.out.println(EntityUtils.toString(entity));
            JSONObject obj = new JSONObject(EntityUtils.toString(entity));
            String url = obj.getJSONObject("webPages").getJSONArray("value").getJSONObject(0).getString("displayUrl");
            System.out.println(url);
        }

    }
}