# 12-FACTOR APP
In the modern era, software is commonly delivered as a service called web apps, or software-as-a-service. The twelve-factor app is a methodology for building software-as-a-service app.

---
## I. Codebase
   A twelve-factor app is always tracked in a version control system, such as Git, Mercurial, or 
   Subversion. A copy of the revision tracking database is known as a code repository, often
   shortened to code repo or just repo.

   A codebase is any single repo (in a centralized revision control system like Subversion), or
   any set of repos who share a root commit (in a decentralized revision control system like Git).

   There is always a one-to-one correlation between the codebase and the app:
   If there are multiple codebases, it’s not an app – it’s a distributed system. Each component
      in a distributed system is an app, and each can individually comply with twelve-factor.
   Multiple apps sharing the same code is a violation of twelve-factor. The solution here is to
      factor shared code into libraries which can be included through the dependency manager.
      
--- 
## II. Dependencies
   Most programming languages offer a packaging system for distributing support libraries, such as
   CPAN for Perl or Rubygems for Ruby. Libraries installed through a packaging system can be
   installed system-wide (known as “site packages”) or scoped into the directory containing the
   app (known as “vendoring” or “bundling”).

   A twelve-factor app never relies on implicit existence of system-wide packages. It declares all
   dependencies, completely and exactly, via a dependency declaration manifest. Furthermore, it
   uses a dependency isolation tool during execution to ensure that no implicit dependencies “leak
   in” from the surrounding system. The full and explicit dependency specification is applied
   uniformly to both production and development.
   
---
## III. Config
   An app’s config is everything that is likely to vary between deploys (staging, production,
   developer environments, etc). 
   This includes:
   *Resource handles to the database, Memcached, and other backing services
   *Credentials to external services such as Amazon S3 or Twitter
   *Per-deploy values such as the canonical hostname for the deploy.
   
---
## IV. Backing services
   A backing service is any service the app consumes over the network as part of its normal
   operation. Examples include datastores (such as MySQL or CouchDB), messaging/queueing systems
   (such as RabbitMQ or Beanstalkd), SMTP services for outbound email (such as Postfix), and
   caching systems (such as Memcached).
   
   Backing services like the database are traditionally managed by the same systems administrators
   who deploy the app’s runtime. In addition to these locally-managed services, the app may also
   have services provided and managed by third parties. Examples include SMTP services (such as
   Postmark), metrics-gathering services (such as New Relic or Loggly), binary asset services
   (such as Amazon S3), and even API-accessible consumer services (such as Twitter, Google Maps,
   or Last.fm).
   The code for a twelve-factor app makes no distinction between local and third party services. 
   
---
## V. Build, release, run
   A codebase is transformed into a (non-development) deploy through three stages:
   *The build stage is a transform which converts a code repo into an executable bundle known as
     a build. Using a version of the code at a commit specified by the deployment process, the
     build stage fetches vendors dependencies and compiles binaries and assets.
   *The release stage takes the build produced by the build stage and combines it with the
     deploy’s current config. The resulting release contains both the build and the config and is
     ready for immediate execution in the execution environment.
   *The run stage (also known as “runtime”) runs the app in the execution environment, by
     launching some set of the app’s processes against a selected release.
     
---
## VI. Processes
   The app is executed in the execution environment as one or more processes.
   In the simplest case, the code is a stand-alone script, the execution environment is a developer’s local laptop with an 
   installed language runtime, and the process is launched via the command line (for example, python my_script.py). On the 
   other end of the spectrum, a production deploy of a sophisticated app may use many process types, instantiated into zero
   or more running processes.
    
---
## VII. Port binding
   Web apps are sometimes executed inside a webserver container. For example, PHP apps might run as a module inside Apache 
   HTTPD, or Java apps might run inside Tomcat.
   
   The twelve-factor app is completely self-contained and does not rely on runtime injection of a webserver into the 
   execution environment to create a web-facing service. The web app exports HTTP as a service by binding to a port, and 
   listening to requests coming in on that port. 
   
---
## VIII. Concurrency
   Any computer program, once run, is represented by one or more processes. Web apps have taken a
   variety of process-execution forms. For example, PHP processes run as child processes of
   Apache, started on demand as needed by request volume. Java processes take the opposite
   approach, with the JVM providing one massive uberprocess that reserves a large block of system
   resources (CPU and memory) on startup, with concurrency managed internally via threads. In both
   cases, the running process(es) are only minimally visible to the developers of the app.
   
---
## IX. Disposability
   The twelve-factor app’s processes are disposable, meaning they can be started or stopped at a
   moment’s notice. This facilitates fast elastic scaling, rapid deployment of code or config
   changes, and robustness of production deploys.
   
---
## X. Dev/prod parity
  Historically, there have been substantial gaps between development (a developer making live
  edits to a local deploy of the app) and production (a running deploy of the app accessed by end
  users). These gaps manifest in three areas:

  *The time gap: A developer may work on code that takes days, weeks, or even months to go into
    production.
  *The personnel gap: Developers write code, ops engineers deploy it.
  *The tools gap: Developers may be using a stack like Nginx, SQLite, and OS X, while the
    production deploy uses Apache, MySQL, and Linux.
    
---
## XI. Logs
   Logs provide visibility into the behavior of a running app. In server-based environments they
   are commonly written to a file on disk (a “logfile”); but this is only an output format.
   
   Logs are the stream of aggregated, time-ordered events collected from the output streams of all
   running processes and backing services. Logs in their raw form are typically a text format with
   one event per line (though backtraces from exceptions may span multiple lines). Logs have no
   fixed beginning or end, but flow continuously as long as the app is operating.
   
---
## XII. Admin processes
   The process formation is the array of processes that are used to do the app’s regular business
   (such as handling web requests) as it runs. Separately, developers will often wish to do one-
   off administrative or maintenance tasks for the app, such as:

   *Running database migrations.
   *Running a console (also known as a REPL shell) to run arbitrary code or inspect the app’s
    models against the live database. Most languages provide a REPL by running the interpreter
    without any arguments (e.g. python or perl) or in some cases have a separate command (e.g. irb
    for Ruby,rails console for Rails).
   *Running one-time scripts committed into the app’s repo (e.g. php scripts/fix_bad_records.php).


