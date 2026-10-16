import XCTest

/// Runs on Apple's iOS Simulator. Browser/WebKit interaction is real simulator
/// accessibility/touch automation, not Playwright's device emulation.
final class RomanceNativeSmokeUITests: XCTestCase {
    override func setUpWithError() throws {
        continueAfterFailure = false
    }

    private func keepScreenshot(_ app: XCUIApplication, name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }

    private func openingNextButton(in app: XCUIApplication) -> XCUIElement {
        return app.buttons.matching(
            NSPredicate(format: "label CONTAINS %@", "继续阅读")
        ).firstMatch
    }

    func testNativeWKWebViewFirstDecision() throws {
        let app = XCUIApplication()
        app.launch()

        let web = app.webViews.firstMatch
        XCTAssertTrue(web.waitForExistence(timeout: 40), "The H5 webview must load.")
        let next = openingNextButton(in: app)
        XCTAssertTrue(next.waitForExistence(timeout: 30),
                      "Opening H5 must expose its reading advance as an accessible button.")

        print("IOS_QA opening webview loaded")
        keepScreenshot(app, name: "01-native-webkit-first-page")

        for advance in 1...7 {
            let current = openingNextButton(in: app)
            XCTAssertTrue(current.waitForExistence(timeout: 15),
                          "The seven required prologue pages must be accessible, step \(advance).")
            XCTAssertTrue(current.isHittable,
                          "The reading button must be touchable, step \(advance).")
            current.tap()
            print("IOS_QA mandatory prologue advance \(advance)/7")
        }

        XCTAssertFalse(openingNextButton(in: app).exists,
                       "After 7 advances, the game must show the real opening choice.")
        let buttons = web.buttons.allElementsBoundByIndex
        let labels = buttons.map { $0.label }
        print("IOS_QA first-decision accessible buttons: \(labels)")
        XCTAssertGreaterThanOrEqual(buttons.filter { $0.isHittable }.count, 3,
                                    "The opening decision must expose at least 3 reachable actions.")
        keepScreenshot(app, name: "02-native-webkit-three-choices")

        // Tap the final accessible decision button, not a simulated JS event.
        let actionable = buttons.filter { $0.isHittable && !$0.label.isEmpty }
        let candidate = actionable.last!
        print("IOS_QA tap candidate: \(candidate.label)")
        candidate.tap()

        XCTAssertTrue(
            app.buttons.matching(
                NSPredicate(format: "label CONTAINS %@", "接着看")
            ).firstMatch.waitForExistence(timeout: 15)
            || app.buttons.matching(
                NSPredicate(format: "label CONTAINS %@", "先缓口气")
            ).firstMatch.exists,
            "A real decision should move to feedback rather than silently dismiss."
        )
        keepScreenshot(app, name: "03-native-webkit-decision-feedback")
    }

    func testRealSimulatorSafariLoadAndTouch() throws {
        // The workflow first opens the localhost H5 via simctl openurl.
        // This test attaches to Safari itself; it never claims a physical iPhone.
        let safari = XCUIApplication(bundleIdentifier: "com.apple.mobilesafari")
        safari.activate()
        let web = safari.webViews.firstMatch
        XCTAssertTrue(web.waitForExistence(timeout: 35),
                      "Safari must expose a web view in the iOS Simulator.")
        keepScreenshot(safari, name: "04-simulator-safari-open")

        let next = openingNextButton(in: safari)
        XCTAssertTrue(next.waitForExistence(timeout: 25),
                      "Safari must have loaded the game's first prologue page, not its start page.")
        XCTAssertTrue(next.isHittable, "Safari H5 reading action must be accessible.")
        next.tap()
        XCTAssertTrue(openingNextButton(in: safari).waitForExistence(timeout: 12),
                      "Safari reading tap must advance to the next prologue page.")
        keepScreenshot(safari, name: "05-simulator-safari-after-real-tap")
        print("IOS_QA Safari actual simulator reading touch PASS")
    }
}
