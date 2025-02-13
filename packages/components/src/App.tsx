// import AppShell from "./components/AppShell";
import { AppShell, Button } from "./components";

function App() {
  return (
    <>
      <AppShell>
        <div className="p-4 flex flex-row flex-wrap gap-3">
          <div className=" card bg-base-100 shadow-sm rounded-box">
            <div className="prose card-body">
              <h3>This is the Header we are talking about</h3>
              <p>
                This is the sub content of this page, it's a bit longer than the
                header so that you can see how it looks like when there is more
                text in here.
              </p>
              <div className="card-actions flex flex-row-reverse gap-2">
                <Button variant="cta">CTA</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
}

export default App;
