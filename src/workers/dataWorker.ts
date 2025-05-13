/// <reference lib="webworker" />

self.onmessage = async (e) => {
  const url = e.data;
  try {
    const res = await fetch(url);
    const json = await res.json();

    const vulnerabilities: any[] = [];
    const groups = json.groups || {};

    for (const groupKey in groups) {
      const repos = groups[groupKey].repos || {};
      for (const repoKey in repos) {
        const images = repos[repoKey].images || {};
        for (const imageKey in images) {
          const image = images[imageKey];
          const vulns = image.vulnerabilities || [];
          vulnerabilities.push(...vulns);
        }
      }
    }

    postMessage({ success: true, data: vulnerabilities });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    postMessage({ success: false, error: message });
  }
};
