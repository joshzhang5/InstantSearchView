import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Random;

import static spark.Spark.*;



public class Hello {

    private static HashMap<String, String> map = new HashMap<>();

    public static void main(String[] args) {
        exception(Exception.class, (e, req, res) -> e.printStackTrace()); // print all exceptions
        get("/:query", (req, resp) -> {
            String q = req.params(":query");
            if (map.containsKey(q)) {
                resp.type("application/json");
                return map.get(q);
            }
            HttpClient httpclient = HttpClients.createDefault();

            URIBuilder builder = new URIBuilder("https://api.cognitive.microsoft.com/bing/v5.0/search");

            builder.setParameter("q", q);
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


            JSONObject obj = new JSONObject(EntityUtils.toString(entity));
            int len = obj.getJSONObject("webPages").getJSONArray("value").length();
            int c = 0;
            JSONArray arr = new JSONArray();
            for (int i = 0; i < len; i++) {
                JSONObject temp = new JSONObject();
                String finalurl = getFinalRedirectedUrl(obj.getJSONObject("webPages").getJSONArray("value").getJSONObject(i).getString("url"));
                temp.put("url", finalurl);
                temp.put("title", obj.getJSONObject("webPages").getJSONArray("value").getJSONObject(i).getString("name"));
                //System.out.println(temp.getString("url"));
                Runtime rt = Runtime.getRuntime();
                Random rand = new Random();
                int a = rand.nextInt();
                Process pr = rt.exec("./wkhtmltoimage --quality 20 " + temp.getString("url") + " google.jpeg");
                pr.waitFor();
                ByteArrayOutputStream output = new ByteArrayOutputStream();
                try {
                    File f = new File("google.jpeg");
                    FileInputStream fis = new FileInputStream(f);
                    BufferedImage img = ImageIO.read(fis);
                    ImageIO.write(img, "jpeg", output);
                    StringBuilder sb = new StringBuilder();
                    sb.append(StringUtils.newStringUtf8(Base64.encodeBase64(output.toByteArray(), false)));
                    temp.put("base64", sb.toString());
                    f.delete();
                    img.flush();
                } catch (Exception e) {
                    e.printStackTrace();
                    continue;
                }
                arr.put(c, temp);
                c++;
            }

            map.put(q, arr.toString());
            resp.type("application/json");
            return arr;
        });
    }

    public static String getFinalRedirectedUrl(String url) {

        HttpURLConnection connection;
        String finalUrl = url;
        int c = 0;
        try {
            do {
                connection = (HttpURLConnection) new URL(finalUrl)
                        .openConnection();
                connection.setInstanceFollowRedirects(false);
                connection.setUseCaches(false);
                connection.setRequestMethod("GET");
                connection.connect();
                int responseCode = connection.getResponseCode();
                if (responseCode >= 300 && responseCode < 400) {
                    String redirectedUrl = connection.getHeaderField("Location");
                    if (null == redirectedUrl)
                        break;
                    finalUrl = redirectedUrl;
                    System.out.println("redirected url: " + finalUrl);
                } else
                    break;
                c++;
            } while (c < 11 && connection.getResponseCode() != HttpURLConnection.HTTP_OK);
            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return finalUrl;
    }
}