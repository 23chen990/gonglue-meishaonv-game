import SwiftUI
import WebKit

/// This temporary QA host exercises the H5 in the real iOS Simulator's WebKit.
/// It is NOT a new user-facing app, a Capacitor package, or a Safari replacement.
struct RomanceGameWebView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        let web = WKWebView(frame: .zero, configuration: configuration)
        web.isOpaque = false
        web.backgroundColor = .black
        web.scrollView.contentInsetAdjustmentBehavior = .never
        let url = URL(string: "http://127.0.0.1:8765/index.html")!
        web.load(URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData))
        return web
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}
}

@main
struct RomanceNativeSmokeApp: App {
    var body: some Scene {
        WindowGroup {
            RomanceGameWebView()
                .ignoresSafeArea()
        }
    }
}
