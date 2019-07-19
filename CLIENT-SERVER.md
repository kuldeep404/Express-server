# How A Request Gets Served
There are a handful of general steps that occur between the time you request a web page and the time it displays in your browser:-
  ### 1.DNS Lookup
  ### 2.Browser sends an HTTP request
  ### 3.Server responds and sends back the requested HTML file
  ### 4.Browser begins to render HTML
  ### 5.Browser sends additional requests for objects embedded in the html file (CSS files, images,javascript, etc.)
    
---
## 1.DNS Lookup
    Domain.com is easy for humans to remember. An IP address like 159.122.35.130 isn’t. The
    latter is how servers are located though, so the first step in requesting a page is converting
    the domain to an IP address.
---
## 2.Browser Sends Request
    After a browser has performed the DNS lookup, it sends an HTTP request to the appropriate
    server. It doesn’t have to literally be HTTP. It can be HTTPS or more recently an HTTP/2
    request. The general idea though it that your browser sends a request for a specific file,
    often an HTML file.
---
## 3.Server Responds
    Once the server receives a request, it will respond, though how will depend on a number of
    things. For example, the page requested may no longer exist on the server and the server will
    send back a 404 (file not found)error.It’s also possible the file has been moved to a new
    location and requests are being redirected temporarily (302) or permanently (301) If this is
    the case your browser needs to make another request for the file at the new location.
---
## 4.Browser Renders Page
    Once your browser receives an HTML file, it needs to render the page and it has to go through
    a few steps before you see it displayed. These steps are called the critical rendering path in
    which your browser needs to:
     *Process HTML markup and build the DOM tree.
     *Process CSS markup and build the CSSOM tree.
     *Combine the DOM and CSSOM into a render tree.
     *Run the layout on the render tree to compute the geometry of each node.
     *Paint the individual nodes to the screen.
---
## 5.Closing Thoughts
    That was a pretty quick walk through of what happens when you type a URL into a browser or
    click a link from one page to another. It admittedly skips a lot of details, but hopefully it’s
    enough to understand that a lot of things happen before a web page loads.
   
---
