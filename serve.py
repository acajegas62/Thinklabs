"""Run the Thinklabs static site using only Python's standard library."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys
import webbrowser


def main():
    root = Path(__file__).resolve().parent
    handler = partial(SimpleHTTPRequestHandler, directory=str(root))
    for port in range(3000, 3011):
        try:
            server = ThreadingHTTPServer(("127.0.0.1", port), handler)
            break
        except PermissionError:
            print("This environment blocks local servers. Run Start Thinklabs.command "
                  "from Finder or run python3 serve.py in your own Terminal.", file=sys.stderr)
            return 1
        except OSError as error:
            import errno
            if error.errno != errno.EADDRINUSE:
                print("Could not start Thinklabs: {}".format(error), file=sys.stderr)
                return 1
    else:
        print("Ports 3000–3010 are busy. Stop an unused local server and try again.",
              file=sys.stderr)
        return 1

    url = "http://127.0.0.1:{}/".format(server.server_port)
    print("Thinklabs is running at {}".format(url), flush=True)
    print("Keep this window open. Press Control+C to stop.", flush=True)
    if "--no-browser" not in sys.argv:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nThinklabs stopped.")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
