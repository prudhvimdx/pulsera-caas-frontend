function getInitials(name) {
    const nameParts = name.split(' ');
    return nameParts.map((part) => part[0].toUpperCase()).join('');
}

export default getInitials;