const Model = {
    staticTable: [
        { name: ":authority", value: "" },
        { name: ":path", value: "/" },
        { name: ":method", value: "GET" },
        { name: ":method", value: "POST" },
        { name: ":status", value: "200" },
        { name: ":status", value: "404" },
        { name: "content-type", value: "application/json" }
    ],
    dynamicTable: [],
    processHeader(name, value) {
        name = name.toLowerCase().trim();
        value = value.trim();
        const staticMatch = this.staticTable.findIndex(h => h.name === name && h.value === value);
        if (staticMatch !== -1) {
            return `Encontrado en tabla estatica. Indice: ${staticMatch}`;
        }
        const dynamicMatch = this.dynamicTable.findIndex(h => h.name === name && h.value === value);
        if (dynamicMatch !== -1) {
            return `Encontrado en tabla dinamica. Indice: ${dynamicMatch}`;
        }
        const staticNameMatch = this.staticTable.findIndex(h => h.name === name);
        const dynamicNameMatch = this.dynamicTable.findIndex(h => h.name === name);
        this.dynamicTable.unshift({ name, value });
        if (staticNameMatch !== -1) {
            return `Nombre encontrado en tabla estatica. Se agrega el nuevo valor.`;
        } else if (dynamicNameMatch !== -1) {
            return `Nombre encontrado en tabla dinamica. Se agrega el nuevo valor.`;
        } else {
            return `Nuevo encabezado agregado a la tabla dinamica.`;
        }
    }
};

const View = {
    init() {
        this.renderStaticTable();
        this.renderDynamicTable();
    },
    renderStaticTable() {
        const tbody = document.querySelector("#staticTableUI tbody");
        tbody.innerHTML = Model.staticTable.map((h, i) => 
            `<tr><td>${i}</td><td>${h.name}</td><td>${h.value || '-'}</td></tr>`
        ).join("");
    },
    renderDynamicTable() {
        const tbody = document.querySelector("#dynamicTableUI tbody");
        if (Model.dynamicTable.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align:center">Vacia</td></tr>`;
            return;
        }
        tbody.innerHTML = Model.dynamicTable.map((h, i) => 
            `<tr><td>${i}</td><td>${h.name}</td><td>${h.value}</td></tr>`
        ).join("");
    },
    appendLog(message) {
        const logBox = document.getElementById("outputLog");
        if (logBox.innerText === "Sin resultados") logBox.innerText = "";
        logBox.innerText = `${message}\n` + logBox.innerText;
    }
};

const Controller = {
    init() {
        View.init();
        document.getElementById("headerForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const nInput = document.getElementById("hName");
            const vInput = document.getElementById("hValue");
            const resultMsg = Model.processHeader(nInput.value, vInput.value);
            View.appendLog(resultMsg);
            View.renderDynamicTable();
            vInput.value = "";
            vInput.focus();
        });
    }
};

window.onload = () => Controller.init();
