package nl.nettes.heim.vacationhome.payload.response;

public class ReviewResponseFile {
    private String fileName;
    private String url;
    private String type;
    private long size;

    public ReviewResponseFile(String fileName, String url, String type, long size){
        this.fileName = fileName;
        this.url = url;
        this.type = type;
        this.size = size;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}

